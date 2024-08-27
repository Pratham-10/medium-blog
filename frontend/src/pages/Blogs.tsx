import { BlogCard } from "../components/BlogCard"
import {Appbar} from "../components/Appbar"
import { useBlogs } from "../hooks"
export const Blogs = () => {
    const {loading,blogs} = useBlogs()
    if(loading){
        return <div>
            loading...
        </div>
    }
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="max-w-2xl">
                {blogs.map ((blog) => <BlogCard 
                id={blog.id}
                authorName={blog.author.name || "Anonymous"} 
                title={blog.title}
                 content={blog.content} 
                 publishedDate="26th Aug,2024" />
                )}
            </div>
        </div>
    </div>
}