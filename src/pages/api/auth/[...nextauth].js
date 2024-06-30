import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'; //구글 소셜로그인
import GithubProvider from 'next-auth/providers/github'; // 깃허브 소셜로그인
import CredentialsProvider from "next-auth/providers/credentials"; // 내 DB 이용

export const authOptions = {
    providers:[
        GoogleProvider({
            clientId:'1031657385047-cdpjitmk8co0ccv3j2809dm5ujnl7jkh.apps.googleusercontent.com',    //구글 클라이언트 ID
            clientSecret:'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',    //구글 클라이언트 보안 비밀번호
        }),
        GithubProvider({
            clientId:'Ov23liDvNpqyrLYxmD45',    //깃허브 클라이언트 ID
            clientSecret:'770a978326309b7267a40dfe30c6e51953ea2322',    //깃허브 클라이언트 비밀번호
        }),
        CredentialsProvider({

        }),
    ],
    secret: 'anything'
};

export default NextAuth(authOptions);

// 소셜로그인 설정
// npm install next-auth

// 구글로그인
/*
    https://console.cloud.google.com/ -> API 및 서비스 -> OAuth 동의 화면 (External 버튼 클릭)
    사용자 인증 정보 -> 사용자 인증 정보 만들기 --> oAuth 2.0 클라이언트 생성 -> 웹 어플리케이션 선택 -> 이름 입력 -> 승인된 리디렉션 URI 추가
    http://localhost:3000/api/auth/callback/google -> 만들기
    클라이언트 ID와 클라이언트 보안 비밀번호 메모해놓기
*/

// 깃허브 로그인 (2024.06 기준)
/*
    github 로그인 -> 우측 프로필 아이콘 클릭 -> Settings -> Developer settings -> oAuth Apps -> Register a new application 혹은 New OAuth App -> Application name 입력 -> http://localhost:3000/ 입력 (실제 사이트도 있으면 실제사이트 URL로 추가하기) -> Generate a new client secret 버튼 클릭
    클라이언트 ID와 클라이언트 비밀번호 메모해놓기
*/

// 구글
// 1031657385047-cdpjitmk8co0ccv3j2809dm5ujnl7jkh.apps.googleusercontent.com
// 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

//깃허브
// Ov23liDvNpqyrLYxmD45
// 770a978326309b7267a40dfe30c6e51953ea2322

// URI(Uniform Resource Identifier = 식별자?)와 URL(Uniform Resource Locator = 위치?)