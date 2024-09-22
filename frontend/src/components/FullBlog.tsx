import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
    console.log("blog", blog);
    return <div>
        <Appbar />
        <div className="flex justify-center pt-4">
            <div className="grid grid-cols-12 px-10 w-full">
                <div className="grid col-span-8">
                    <div className="text-4xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="grid col-span-4">
                    <div className="text-slate-700 pt-2">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                            {blog.author.name || "Anonymous"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}