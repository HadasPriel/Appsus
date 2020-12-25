export function NoteColorPicker ({onSetColor, toggleColor}){



   const onChangeColor = (color) => {
        onSetColor(color)
        toggleColor()
    }




    return (
        <section className='note-color-picker' style={{ backgroundColor: "white" }}>

            <span onClick={() => onChangeColor("#679186")} style={{ backgroundColor: "#679186" }}></span>
            <span onClick={() => onChangeColor("#ffb4ac")} style={{ backgroundColor: "#ffb4ac" }}></span>
            <span onClick={() => onChangeColor("#d291bc")} style={{ backgroundColor: "#d291bc" }}></span>
            <span onClick={() => onChangeColor("#99e1e5")} style={{ backgroundColor: "#99e1e5" }}></span>
        </section>
    );

}



// export class NoteColorPicker extends React.Component {

//     state = {

//         keep: {}

//     };

//     componentDidMount() {
//         const { keep } = this.props
//         this.setState({ keep })
//     }

//     onChangeColor = (color) => {
//         this.props.onSetColor(color)
//         this.props.toggleColor()
//     }


//     render() {

//         return (
//             <section className='note-color-picker'style={{ backgroundColor: "white" }}>

//                 <span onClick={() => this.onChangeColor("#679186")} style={{ backgroundColor: "#679186" }}></span>
//                 <span onClick={() => this.onChangeColor("#ffb4ac")} style={{ backgroundColor: "#ffb4ac" }}></span>
//                 <span onClick={() => this.onChangeColor("#d291bc")}style={{ backgroundColor: "#d291bc" }}></span>
//                 <span onClick={() => this.onChangeColor("#99e1e5")}style={{ backgroundColor: "#99e1e5" }}></span>
//             </section>
//         );
//     }
// }