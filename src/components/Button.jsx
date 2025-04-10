function Button({onclick, className, text, type ,children }) {
    return (
        <button 
        type={type} 
        onClick={onclick} 
        className={className} 
        >
            {children ? children :  text}
        </button>
    );
}

export default Button;