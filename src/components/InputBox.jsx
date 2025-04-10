function InputBox({ placeholder , className , value , type='text' , required=false  , onChange ,accept , name } ) {
    return (
        <>
            <input 
            type={type} 
            name={name} 
            value={value}    
            accept={accept}
            onChange={onChange} 
            required={required} 
            className={className} 
            placeholder={placeholder} 
            />
        </>
    );
}

export default InputBox;