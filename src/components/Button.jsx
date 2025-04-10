function Button({onclick, className, text, type }) {
    return (
        <>
        <button 
        type={type} 
        onClick={onclick} 
        className={className} 
        >{text}</button>
        </>
    );
}

export default Button;