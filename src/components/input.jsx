

const Input = ({
    id,
    label,
    type = 'text',
    required,
    register,
}) => {
    
    return (
        <div className="w-full">
            <input
                type={type}
                id={id}
                {...register(id, { required })}
                placeholder={label}
                className={`flex h-9 w-full rounded-md border border-neutral-300 px-3 py-1 text-base shadow-sm focus:ring-1 focus-visible:outline-none focus-visible:border-none focus:ring-black placeholder:font-normal placeholder:text-neutral-400/80  placeholder:text-base
                `    
                }

                // className={`
                //     w-full
                //     p-2.5
                //     text-sm
                //     bg-white
                //     border
                //     rounded-md
                //     outline-none
                //     ${hasError ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-300 focus:border-black'}
                // `}
            />
        </div>
    );
};

export default Input;
