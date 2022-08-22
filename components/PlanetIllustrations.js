export function PlanetIllustrations({ hiddenOnMobile }) {
    return (
        <div className="absolute w-full h-screen">
            <div className="absolute hidden w-[243px] h-[243px] top-16 left-48 sm:block">
                <img src="/planet-top-left.svg" alt="planet1" />
            </div>
            <div className={`absolute right-0 sm:w-[297px] sm:h-[347px] sm:-top-4 sm:right-0 w-[227px] h-[257px] ${hiddenOnMobile && "hidden sm:block"}`}>
                <img src="/planet-top-right.svg" alt="planet2"/>
            </div>
            <div className={`absolute sm:w-[500px] sm:h-[500px] sm:bottom-12 sm:left-0 w-[200px] h-[200px] bottom-4 -left-16 ${hiddenOnMobile && "hidden sm:block"}`}>
                <img src="/planet-bottom-left.svg" alt="planet3"/>
            </div>
            <div className="absolute hidden w-[256px] h-[256px] bottom-28 right-48 -rotate-[15deg] sm:block">
                <img src="/planet-bottom-right.svg" alt="planet4"/>
            </div>
        </div>
    )
}