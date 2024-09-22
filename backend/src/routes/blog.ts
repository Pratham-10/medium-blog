import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import {verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: any
    }
}>();

blogRouter.use('/*', async (c, next) => {
    try {
        const header = c.req.header("authorization") || ""
        const token = header?.split(" ")[1]
        const response = await verify(token, c.env.JWT_SECRET)
        if (response) {
            c.set('userId', response.id)
            await next()
        } else {
            c.status(403)
            return c.json({
                status: 403,
                message: "Unauthorised"
            })
        }
    } catch (error) {
        console.log(error);
        return c.json({
            status: 500,
            data: {},
            message: "something went wrong while getting this blog"
        })
    }

})

blogRouter.get('/bulk', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
        const blogs = await prisma.post.findMany({
            select:{
                title:true,
                content:true,
                id:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }

        });
        return c.json({
            status: 200,
            data: blogs,
            message: "fetched all blogs successfully!!"
        })
    } catch (error) {
        console.log(error);
        return c.json({
            status: 500,
            data: {},
            message: "something went wrong while getting this blog"
        })
    }
})

blogRouter.get('/:id', async (c) => {
    try {
        const blogId = await c.req.param('id')
        console.log(blogId);
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
        const blog = await prisma.post.findFirst({
            where: {
                id: blogId
            },
            select : {
                title : true,
                content : true,
                id : true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
        return c.json({
            status: 200,
            data: blog,
            message: "blog fetched successfully!!"
        })
    } catch (error) {
        console.log(error);
        return c.json({
            status: 500,
            message: "something went wrong while getting this blog"
        })
    }
})

blogRouter.post('/', async (c) => {
    try {
        const body = await c.req.json();
        const authorId = c.get('userId')
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL
        }).$extends(withAccelerate())
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        })
        return c.json({
            status: 200,
            data: blog,
            message: "blog created successfully!!",
        })
    } catch (error) {
        console.log(error);
        return c.json({
            status: 500,
            data: {},
            message: "something went wrong while getting this blog"
        })
    }

})
blogRouter.put('/:id', async (c) => {
    try {
        const blogId = c.req.param('id')
        const body = await c.req.json();
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL
        }).$extends(withAccelerate())
        const blog = await prisma.post.update({
            where: { id: blogId },
            data: {
                title: body.title,
                content: body.content
            }
        })
        return c.json({
            status: 200,
            data: blog,
            message: "blog updated successfully!!",
        })
    } catch (error) {
        console.log(error);
        return c.json({
            status: 500,
            data: {},
            message: "something went wrong while getting this blog"
        })
    }
})