export const FormInput = ({label, type, value, placeholder, onChange, defaultValue, children, maxLength, className}) => {
  return(
     <div className="form-group">
        <div className="form-bar">
          <label for="" className="form-label">{label}</label>
          <input 
            className={`form-input ${className}`} 
            type={type || 'text'} 
            defaultValue={defaultValue}
            value={value || ''}
            placeholder={placeholder || ''} 
            maxLength={maxLength}
            onChange={(event) => onChange ?.(event.target.value)}
          />
          {children || ""}
        </div>
      </div>
  )
}

export const FormTextarea = ({
  label, value, placeholder, onChange, children, maxLength, className
}) => {
  return(
    <div class="form-group">
      <div class="form-bar-textarea">
        <label for="" class="form-label">{label}</label>
        <textarea 
          name="form-textarea" 
          className={`form-textarea ${className}`}
          id="form-textarea" maxLength={maxLength} 
          placeholder={placeholder}
          onChange = {(event) => onChange ?.(event.target.value)}
          >{value}</textarea>
          {children || ""}
      </div>
    </div>
  )
}

