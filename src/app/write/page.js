// 글 작성할 때 이메일도 같이 기록하게 해서
// 수정과 삭제할 때도 같은 이메일로 로그인해있을 때만
// 수정 및 삭제 가능하게 변경

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth"

export default async function WritePage() {
    // 글 작성하기 전에 session을 검사해서
    // 로그인 중이면 원래 return 띄어주고
    // 로그인 안해있으면 로그인 필요하다고 return으로 띄어주기
    let session = await getServerSession(authOptions);
    //console.log('글작성 로그인정보 : ', session);

    // 로그인 세션이 null이 아닐 때만 글 작성 페이지를 보여준다
    if(session) {
        return (
            <div className='write-container'>
                <h4>글 작성 페이지</h4><br/>
                {/* /api/test에 POST요청 */}
                <form action = '/api/post/new' method = 'POST'>
                    <input name = 'title' placeholder="제목을 입력하세요"/>
                    <input name = 'content' placeholder="내용을 입력하세요"/>
                    <button type = 'submit'>POST 요청 버튼</button>
                </form>

                <br/>
                
                {/* /api/test에 GET요청 */}
                <form action = '/api/test'>  {/* method 생략하면 GET으로 나감 */}
                    <button type = 'submit'>GET 요청 버튼</button>
                </form>
            </div>
        )
    }else {
        return (
            <div>로그인이 필요해요</div>
    )
    }
}

// 서버 통신 방식 (간단하게 URL통해서 메세지를 주고받자 REST API)
// REST API : GET, POST, DELETE, PUT 요청하면 -> 응답줌
// GET요청 : 서버에 데이터를 요청할 때
// POST요청 : 서버에 데이터를 전송할 때(보안성 좋음, 길다)