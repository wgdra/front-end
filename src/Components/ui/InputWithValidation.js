import clsx from 'clsx'

const InputWithValidation = ({ register, className, ...props }) => {
  const isError = props.errors[props.name]

  return (
    <>
      <input
        id={props.name}
        type={props.type !== undefined ? props.type : 'text'}
        className={clsx(className, isError ? 'border border-red-500' : '')}
        placeholder={props.placeholder}
        {...register(props.name)}
      />

      {isError && <label className="text-[#fe0001]">{isError.message}</label>}
    </>
  )
}

export default InputWithValidation
