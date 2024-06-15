import { connectDB } from "@/util/db";
import Link from "next/link";

export default async function ListPage() {
    const db = (await connectDB).db('mydb');    // await을 쓰려면 async function으로 써야함.
    let result = await db.collection('post').find().toArray();
    return (
        <div className = 'list-bg'>
            {
                //result가 비어있지 않고 항목이 0보다 많니?
                result && result.length > 0? result.map((item,index)=>{
                    return (
                        <div key = {index} className = 'list-item'>
                            <Link href = {'/detail/' + item._id}>
                                <h4>{item.title}</h4>
                                <p>{item.content}</p>
                            </Link>
                        </div>
                    )
                }) : null
            }
        </div>
    )
}