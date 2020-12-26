const { Link, NavLink } = ReactRouterDOM;

export function Home() {

    return (
        <section className="home main">

            <div className="hero main-layout">
                <div className="main-layout">
                    <h2>Breathe</h2>
                    <h2>Relax</h2>
                    <h2 className="last">Organize everything</h2>
                </div>
            </div>

            <div className="seconde main-layout">
                <div className="main-layout">
                    <h2>here you have anything you need</h2>
                    <p>Hard to explain so Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis aliquid placeat voluptates maxime dolores sapiente, incidunt beatae, earum ullam error sed enim, vitae quos. Impedit porro quis animi voluptas incidunt! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus culpa necessitatibus corporis quaerat aut blanditiis dolorem. Quidem fugiat, maiores quae laboriosam id at ex perspiciatis ipsam pariatur adipisci, aut architecto?</p>
                    <button>Join Us</button>
                </div>
            </div>
            <div className="therd main-layout">
                <div className="main-layout">
                    <h2>KEEP</h2>
                    <h3>the most important to you</h3>
                    <Link className="btn" to={'/keep'}>Try</Link>
                </div>
            </div>
            <div className="seconde main-layout">
                <div className="main-layout">
                    <h2>organization tips</h2>
                    <p>use TODO list to orgnize your tasks so Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis aliquid placeat voluptates maxime dolores sapiente, incidunt beatae, earum ullam error sed enim, vitae quos. Impedit porro quis animi voluptas incidunt! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus culpa necessitatibus corporis quaerat aut blanditiis dolorem. Quidem fugiat, maiores quae laboriosam id at ex perspiciatis ipsam pariatur adipisci, aut architecto?</p>
                </div>
            </div>
            <div className="therd five main-layout">
                <div className="main-layout">
                    <h2>MAIL</h2>
                    <h3>keep in tuch</h3>
                    <Link className="btn" to={'/mail'}>Try</Link>
                </div>
            </div>
            <div className="seconde main-layout">

            </div>
        </section>
    )
}