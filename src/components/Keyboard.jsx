export default function Keyboard() {
    return (
        <div id="kb-container">
            <div className="kb-row">
                <button className="kb-key kb-key-hover" data-key="Q">Q</button>
                <button className="kb-key kb-key-hover" data-key="W">W</button>
                <button className="kb-key kb-key-hover" data-key="E">E</button>
                <button className="kb-key kb-key-hover" data-key="R">R</button>
                <button className="kb-key kb-key-hover" data-key="T">T</button>
                <button className="kb-key kb-key-hover" data-key="Y">Y</button>
                <button className="kb-key kb-key-hover" data-key="U">U</button>
                <button className="kb-key kb-key-hover" data-key="I">I</button>
                <button className="kb-key kb-key-hover" data-key="O">O</button>
                <button className="kb-key kb-key-hover" data-key="P">P</button>
            </div>
            <div className="kb-row">
                <button className="kb-key kb-key-hover" data-key="A">A</button>
                <button className="kb-key kb-key-hover" data-key="S">S</button>
                <button className="kb-key kb-key-hover" data-key="D">D</button>
                <button className="kb-key kb-key-hover" data-key="F">F</button>
                <button className="kb-key kb-key-hover" data-key="G">G</button>
                <button className="kb-key kb-key-hover" data-key="H">H</button>
                <button className="kb-key kb-key-hover" data-key="J">J</button>
                <button className="kb-key kb-key-hover" data-key="K">K</button>
                <button className="kb-key kb-key-hover" data-key="L">L</button>
            </div>
            <div className="kb-row">
                <button className="kb-key kb-key-hover" data-key="Backspace" id="delete-key"><img id="backspace-icon" src="/assets/icons/backspace-icon.svg" alt="backspace-icon" /></button>
                <button className="kb-key kb-key-hover" data-key="Z">Z</button>
                <button className="kb-key kb-key-hover" data-key="X">X</button>
                <button className="kb-key kb-key-hover" data-key="C">C</button>
                <button className="kb-key kb-key-hover" data-key="V">V</button>
                <button className="kb-key kb-key-hover" data-key="B">B</button>
                <button className="kb-key kb-key-hover" data-key="N">N</button>
                <button className="kb-key kb-key-hover" data-key="M">M</button>
                <button className="kb-key kb-key-hover" data-key="Enter" id="enter-key"><img id="enter-icon" src="/assets/icons/enter-icon.svg" alt="enter-icon" /></button>
            </div>
        </div>
    )
}
