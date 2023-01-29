// import { Suspense } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import Layout from "src/core/layouts/Layout"
// import { useCurrentUser } from "src/users/hooks/useCurrentUser"
// import logout from "src/auth/mutations/logout"
// import logo from "public/logo.png"
// import { useMutation } from "@blitzjs/rpc"
// import { Routes, BlitzPage } from "@blitzjs/next"

// /*
//  * This file is just for a pleasant getting started page for your new app.
//  * You can delete everything in here and start from scratch if you like.
//  */

// const UserInfo = () => {
//   const currentUser = useCurrentUser()
//   const [logoutMutation] = useMutation(logout)

//   if (currentUser) {
//     return (
//       <>
//         <button
//           className="button small"
//           onClick={async () => {
//             await logoutMutation()
//           }}
//         >
//           Logout
//         </button>
//         <div>
//           User ref: <code>{currentUser.referenceId}</code>
//           <br />
//           User key: <code>{currentUser.account?.key}</code>
//           <br />
//           User status: <code>{currentUser.account?.status}</code>
//         </div>
//       </>
//     )
//   } else {
//     return (
//       <>
//         <Link href={Routes.SignupPage()}>
//           <a className="button small">
//             <strong>Sign Up</strong>
//           </a>
//         </Link>
//         <Link href={Routes.LoginPage()}>
//           <a className="button small">
//             <strong>Login</strong>
//           </a>
//         </Link>
//       </>
//     )
//   }
// }

// const Home: BlitzPage = () => {
//   return (
//     <Layout title="Home">
//       <div className="container">
//         <main>
//           <div className="logo">
//             <Image src={`${logo.src}`} alt="blitzjs" width="256px" height="118px" layout="fixed" />
//           </div>
//           <p>
//             <strong>Congrats!</strong> Your app is ready, including user sign-up and log-in.
//           </p>
//           <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
//             <Suspense fallback="Loading...">
//               <UserInfo />
//             </Suspense>
//           </div>
//           <p>
//             <strong>
//               To add a new model to your app, <br />
//               run the following in your terminal:
//             </strong>
//           </p>
//           <pre>
//             <code>blitz generate all project name:string</code>
//           </pre>
//           <div style={{ marginBottom: "1rem" }}>(And select Yes to run prisma migrate)</div>
//           <div>
//             <p>
//               Then <strong>restart the server</strong>
//             </p>
//             <pre>
//               <code>Ctrl + c</code>
//             </pre>
//             <pre>
//               <code>blitz dev</code>
//             </pre>
//             <p>
//               and go to{" "}
//               <Link href="/projects">
//                 <a>/projects</a>
//               </Link>
//             </p>
//           </div>
//           <div className="buttons" style={{ marginTop: "5rem" }}>
//             <a
//               className="button"
//               href="https://blitzjs.com/docs/getting-started?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Documentation
//             </a>
//             <a
//               className="button-outline"
//               href="https://github.com/blitz-js/blitz"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Github Repo
//             </a>
//             <a
//               className="button-outline"
//               href="https://discord.blitzjs.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Discord Community
//             </a>
//           </div>
//         </main>

//         <footer>
//           <a
//             href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Powered by Blitz.js
//           </a>
//         </footer>

//         <style jsx global>{`
//           @import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;700&display=swap");

//           html,
//           body {
//             padding: 0;
//             margin: 0;
//             font-family: "Libre Franklin", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
//               Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
//           }

//           * {
//             -webkit-font-smoothing: antialiased;
//             -moz-osx-font-smoothing: grayscale;
//             box-sizing: border-box;
//           }
//           .container {
//             min-height: 100vh;
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             align-items: center;
//           }

//           main {
//             padding: 5rem 0;
//             flex: 1;
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             align-items: center;
//           }

//           main p {
//             font-size: 1.2rem;
//           }

//           p {
//             text-align: center;
//           }

//           footer {
//             width: 100%;
//             height: 60px;
//             border-top: 1px solid #eaeaea;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             background-color: #45009d;
//           }

//           footer a {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//           }

//           footer a {
//             color: #f4f4f4;
//             text-decoration: none;
//           }

//           .logo {
//             margin-bottom: 2rem;
//           }

//           .logo img {
//             width: 300px;
//           }

//           .buttons {
//             display: grid;
//             grid-auto-flow: column;
//             grid-gap: 0.5rem;
//           }
//           .button {
//             font-size: 1rem;
//             background-color: #6700eb;
//             padding: 1rem 2rem;
//             color: #f4f4f4;
//             text-align: center;
//           }

//           .button.small {
//             padding: 0.5rem 1rem;
//           }

//           .button:hover {
//             background-color: #45009d;
//           }

//           .button-outline {
//             border: 2px solid #6700eb;
//             padding: 1rem 2rem;
//             color: #6700eb;
//             text-align: center;
//           }

//           .button-outline:hover {
//             border-color: #45009d;
//             color: #45009d;
//           }

//           pre {
//             background: #fafafa;
//             border-radius: 5px;
//             padding: 0.75rem;
//             text-align: center;
//           }
//           code {
//             font-size: 0.9rem;
//             font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
//               Bitstream Vera Sans Mono, Courier New, monospace;
//           }

//           .grid {
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             flex-wrap: wrap;

//             max-width: 800px;
//             margin-top: 3rem;
//           }

//           @media (max-width: 600px) {
//             .grid {
//               width: 100%;
//               flex-direction: column;
//             }
//           }
//         `}</style>
//       </div>
//     </Layout>
//   )
// }

// export default Home

import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react"

export default function SplitScreen() {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "green.400",
                zIndex: -1,
              }}
            >
              MeetVPN
            </Text>
            <br />{" "}
            <Text color={"blue.600"} as={"span"}>
              A better way to break the censorship and free the internet
            </Text>{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            MeetVPN is a VPN service provider, allowing you to break through the censored barrier to
            an open internet and protect your privacy online.
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Link href="/app/MeetVPN-alpha-app-release.apk" isExternal>
              <Button
                rounded={"full"}
                bg={"green.500"}
                size={"lg"}
                color={"white"}
                _hover={{
                  bg: "green.600",
                }}
              >
                Donwload APK for Android
              </Button>
            </Link>
            {/* <Button rounded={"full"}>How It Works</Button> */}
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} src={"/img/deviceframes.png"} />
      </Flex>
    </Stack>
  )
}
