import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: number
}
export const BlogCard = ({ id, authorName, title, content, publishedDate }: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-200 p-4">
            <div className="flex">
                <div className="flex justify-center flex-col px-1">
                    <Avatar name={authorName} />
                </div>
                <div className="font-normal text-sm flex justify-center">{authorName}</div>
                <div className="flex flex-col justify-center">
                    <div className="mx-1 mt-0.5 h-0.5 w-0.5 rounded-full bg-gray-400"></div>
                </div>
                <div className="font-extralight text-sm flex justify-center">{publishedDate}</div>
            </div>
            <div className="text-2xl font-bold pt-2">
                {title}
            </div>
            <div className="text-lg font-normal">
                {content.length > 100 ? (content.slice(0, 150) + "...") : content}
            </div>
            <div className="text-slate-500 font-thin pt-3">
                {`${Math.ceil(content.length / 120)} minutes read`}
            </div>
        </div>
    </Link>
}

export function Avatar({ name,size=5 }: { name: string,size?:number}) {
    return <div className={`relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-400`}>
        <span className="font-extralight text-xs text-gray-500 dark:text-gray-200">{name[0]}</span>
    </div>

}