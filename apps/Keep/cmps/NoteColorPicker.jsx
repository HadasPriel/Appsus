export function NoteColorPicker({ onSetColor, toggleColor }) {



    const onChangeColor = (color) => {
        onSetColor(color)
        toggleColor()
    }




    return (
        <section className='note-color-picker'>
            <span onClick={() => onChangeColor("#d0e1f9")} style={{ backgroundColor: "#d0e1f9" }}></span>
            <span onClick={() => onChangeColor("#a8e6cf")} style={{ backgroundColor: "#a8e6cf " }}></span>
            <span onClick={() => onChangeColor("#ffb4ac")} style={{ backgroundColor: "#ffb4ac" }}></span>
            <span onClick={() => onChangeColor("#d291bc")} style={{ backgroundColor: "#d291bc" }}></span>
            <span onClick={() => onChangeColor("#99e1e5")} style={{ backgroundColor: "#99e1e5" }}></span>
            <span onClick={() => onChangeColor("#e0a899")} style={{ backgroundColor: "#e0a899" }}></span>
            <span onClick={() => onChangeColor("#fec8c1")} style={{ backgroundColor: "#fec8c1" }}></span>
        </section>
    );

}

