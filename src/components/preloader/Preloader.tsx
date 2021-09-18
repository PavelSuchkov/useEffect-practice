import Hourglass from './assets/Hourglass.gif';
// import preloader_spinner from './assets/preloader_spinner.svg';

export const Preloader = () => {
    return <div>
        <img src={Hourglass} style={ {position: "fixed", top: "50%", left: "50%", textAlign: "center", width: "5%"} }/>
    </div>
}