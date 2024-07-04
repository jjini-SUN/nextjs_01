import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "@/util/db";
import { ObjectId } from "mongodb";

// api/comment/new로 요청하면 받을 API 서버
export default async function handler(req, res) {
    // POST 방식으로 요청이 들어오면
    if(req.method == 'POST') {
        console.log(req.body); // 프론트에서 어떤 메세지를 보내왔는지?
        // JSON 문자열은 해체해서 사용한다 (자바스크립트는 object 형태로 해체가 됨)
        let reqObject = JSON.parse(req.body); // JSON규칙의 문자열 -> object 자료형
        console.log(reqObject);

        // 현재 로그인한 정보 (로그인 안되어있으면 session == null)
        let session = await getServerSession(req, res, authOptions)
        // getServerSession을 사용해서 현재 로그인 정보를 가져올 수 있음
        console.log(session)

        // 댓글을 DB에 저장
        // 1. 댓글내용  2. 게시글 ID  3. 사용자의 이메일
        // mydb 데이터베이스 안에 'comment' 컬렉션(폴더)에 저장
        if(session !== null) {
            //로그인 상태가 맞으면
            let insertItem = {
                content : reqObject.comment,
                parent: ObjectId.createFromHexString(reqObject.boardId),
                email:session.user?.email
            }

            //insertOne
            try {
                const db = (await connectDB).db('mydb')
                let result = await db.collection('comment').insertOne(insertItem);
                console.log('댓글입력완료')
                res.status(200).json(insertItem)
            }catch(error) {
                console.log('댓글입력실패 : ', error);
                res.status(500).json({error:error})
            }
        }else {
            res.status(400).json({error: '로그인이 안되어있습니다.'})
        }

       // res.status(200).json({msg:'받았음'})
    }
}