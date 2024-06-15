//localhot:3000/api/test 서버

// 이건 컴포넌트가 아니므로 대문자로 안써도 됨
// 그냥 nodejs함수
export default function handler(req, res) { 
    if(req.method == 'POST') {
        return res.status(200).json('POST 완료');
    }else if(req.method == 'GET') {
        let datetime = new Date();
        return res.status(200).json(datetime + 'GET 완료');
    }
}

// 200 : 성공
// 500 : 서버기능 에러
// 404 : 페이지 없음
// 400 : 요청 실수 (잘못보냄)
// ...