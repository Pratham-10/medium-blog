import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    },
  }>();

  userRouter.post('/signup',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl:c.env?.DATABASE_URL
    }).$extends(withAccelerate())
  
    const body = await c.req.json()
    const user = await prisma.user.create({
      data:{
        email:body.email,
        password:body.password
      }
    })
    const token = await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({
      status:200,
      message:"User signed up successfully!!",
      token:token
    })
  })
  userRouter.post('/login',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl:c.env?.DATABASE_URL
    }).$extends(withAccelerate())
  
    const body = await c.req.json()
    const user = await prisma.user.findUnique({
      where:{
        email:body.email,
        password:body.password
      }
    })
    if(!user){
      c.status(403);
      return c.json({status:403,message:"User does not exist"})
    }
    const token = await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({
      status:200,
      message:"User logged in successfully!!",
      token:token
    })
  })
  