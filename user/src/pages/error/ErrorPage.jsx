import { animated_bg_error } from "../../assets/images/index.js"

const ErrorPage = () => {
    return (
        <>
            <main className="flex items-center justify-center relative h-screen z-0 px-6 py-12 md:px-8 bg-[var(--backgroundColor)]">
                <section className="flex flex-col items-center justify-center w-full mx-autor">
                    <div className="flex flex-col justify-center align-center absolute inset-0 z-[-1] lg:flex-row p-0">
                        <div className="flex align-center justify-center h-full w-full p-0 m-0">
                            <div 
                              className="bg-contain bg-center bg-no-repeat h-full w-full lg:size-[85%] 3xl:size-full" 
                              style={{backgroundImage: `url('${animated_bg_error}')`}}
                            ></div>
                        </div>
                        <div className="flex align-center justify-center h-full w-full p-0 m-0">
                            <div 
                              className="bg-contain bg-center bg-no-repeat h-full w-full lg:size-[85%] 3xl:size-full" 
                              style={{backgroundImage: `url('${animated_bg_error}')`}}
                            ></div>
                        </div>
                    </div>
                    <h1 className="text-slate-400 text-[130px] font-bold leading-[152px]">
                        404
                    </h1>
                    <h2 className="heading2 text-center text-white">
                        The page does not exist
                    </h2>
                    <div className="my-10 w-full md:w-[70%]">
                        <p className="base-regular text-center text-white-800">
                            Sorry! We couldn’t find the page.
                        </p>
                    </div>
                    <a className="flex-center cursor-pointer rounded-full bg-[var(--mainColor)] px-6 py-4 text-[14px] font-semibold leading-[16px] text-white"
                      href="/auth/login"
                    >
                        Go back to Homepage →
                    </a>
                </section> 
            </main>
        </>
    )
}

export default ErrorPage