const FormInput = ({label, type, value, placeholder, onChange, defaultValue}) => {
  return(
     <div className="form-group">
        <div className="form-bar">
          <label for="" className="form-label">{label}</label>
          <input 
            className="form-input" 
            type={type || 'text'} 
            defaultValue={defaultValue}
            value={value || ''}
            placeholder={placeholder || ''} 
            onChange={(event) => onChange ?.(event.target.value)}
          />
        </div>
      </div>
  )
}

export default FormInput;

