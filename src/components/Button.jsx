function Button({onclick, className, text, type, children, loading=false, disabled=false }) {
    return (
        <button 
        type={type} 
        disabled={loading || disabled}
        onClick={onclick} 
        className={`
            ${className}
            ${loading || disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-100"}
            transition duration-300
        `} 
        >
            {loading ? "Loading..." : (children || text)}
        </button>
    );
}

export default Button;