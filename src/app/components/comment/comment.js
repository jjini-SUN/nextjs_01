'use client'
// 'use client'를 해야 onClick, onChange, useState, fetch 등 프론트앤드 전용 함수를 사용할 수 있음

import { useEffect, useState } from 'react';
// 리액트 방식으로 새로고침없이 state와 ajax 요청 (fetch)
import './comment.css';

// 컴포넌트는 대문자로 시작
export default function Comment({boardId}) {
    const [comment, setComment] = useState(''); // input창에 입력한 내용
    const [commentList, setCommentList] = useState([]); // 보여줄 댓글들

    // 페이지가 로딩될 때 commentList의 내용을 요청한다
    // useEffect : 로딩될 때, 언로딩될 때, 갱신될 때
    useEffect(()=>{
        // 서버에 댓글리스트를 GET요청해서 받아온다
        // 받아온 응답을 setCommentList에 담는다
        fetch('/api/comment/list?id='+boardId)
        .then(res=>res.json())
        .then(result=>{
            setCommentList(result);
        })
    }, [])

    return (
        <div className="comment-container">
            <hr/>
            {
                commentList.length > 0 ? (
                    commentList.map((item, index)=>{
                        return(
                            <p key={index}>{item?.content}</p> // index 대신 사실 item._id.toString() 이게 좋음
                            
                        )
                    })
                ) : (
                    <p>댓글 로딩 중</p>
                )
            }
            {/* onChange : 무언가 입력될 때마다 발동되는 함수 */}
            <input onChange={(e)=>{setComment(e.target.value)}} id='comment-input'/> {/* input된 입력된 값 */}
            {/* 버튼이 클릭되면 /api/comment/new에 저장해달라고 요청을 보내자 */}
            <button onClick={()=>{
                document.getElementById('comment-input').value = '';
                // 서버에 body 메세지를 보낼 땐 JSON 문자열로 보내기
                fetch('/api/comment/new', {method:'POST', 
                    body: JSON.stringify({comment:comment, boardId:boardId})
                }) // 댓글내용 + 게시글 ID 을 JSON 문자열로 만들어서 body에 넣어달라.
                .then((res)=>{
                    if(res.status == 200) {
                        return res.json()
                    }
                })
                .then((result)=>{
                    console.log(result)
                    // 여기에서 state를 업데이트해서 화면에 반영
                    setComment('');
                    setCommentList(prev => [...prev, result]) // 이전값을 받아서 해체한 다음에 result값 추가? (새댓글 추가)
                })

            }}>댓글 입력</button>
        </div>
    )
}

// pages/api/commnet 폴더 만들고 new.js 파일 생성