function InputBox({ label , placeholder , className , value , type='text' , required=false  , onChange ,accept , name } ) {
    return (
        <>
        <div className="flex flex-col gap-1 w-full">

       {label && (
           <label
           htmlFor={name}
           className="text-sm font-medium text-gray-300"
           >
          {label}
        </label>
      )}
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
            </div>
        </>
    );
}

export default InputBox;