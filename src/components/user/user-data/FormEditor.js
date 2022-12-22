import React, {useEffect, useState, useRef} from 'react';
import { v4 as uuid } from 'uuid';

const FormEditor = ({keysAndLabels, data = null, skipFields, handleSubmit, handleCancel = () => {}, deleteOption = false}) => {
    const [formData, setFormData] = useState(null);
    const [formErrors, setFormErrors] = useState(null);
    const [editableFormData, setEditableFormData] = useState(null);
    const [itemNumberInArray, setItemNumberInArray] = useState(null);
    const [isEditDone, setIsEditDone] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const ref = useRef();

    const setUpEditFormData =  (index) => {
        setItemNumberInArray(index);
        setEditableFormData(formData[index]);
        setShowForm(true);
    }

    const initializeEMptyFormData = () => {       
        let obj = {};
        Object.keys(keysAndLabels).forEach(key => obj[key] = "");
        setEditableFormData(obj);
    }


    useEffect(() => {
        if(!data){
            initializeEMptyFormData();
            setShowForm(true);
        }else{
            setShowForm(false);
        }
        setFormData(data);        
    }, [data]);

    useEffect(() =>{
        if(isEditDone){
            handleSubmit(formData);
            //console.log(formData);
            setIsEditDone(false);
        }

    }, [formData]);


    const handleField = (e, k) => {
        setEditableFormData({...editableFormData, [k]: e.target.value})
    }

    useEffect(() => {
        if(isEditDone){
            let array = formData?.filter((item, index) => index !== itemNumberInArray);

            if(formData && itemNumberInArray >= 0 ) {// itemNumberInArray can be null which means this is the initial run of useEffect on first load
                if(editableFormData)
                    setFormData([...array, editableFormData]);
                else
                    setFormData(array);
            }else{
                setFormData([editableFormData]);
            }

            setItemNumberInArray(null);
            setEditableFormData(null);
        }
            
    },[isEditDone]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if(!handleFormErrors(setFormErrors))
            return;

            if(!formData ){//No form data was sent to this component. It means we have to create a new address and then its ID
                const id = uuid();
                setEditableFormData({...editableFormData, _id: id});
            }
            setIsEditDone(true);
            setShowForm(false);
    }

    const handleFormErrors = (callback) => {
        const form = ref.current;
        const errors = {};
        for(let element of form.elements){
            if(element.type === "text") {
                if(element.value.trim() === "")
                    errors[element.id] = true;
            }
        }
        callback(errors);
        
        if(Object.keys(errors).length > 0)
            return false;
        else
            return true;

    }

    const cancelEdit = (e) => {
        e.preventDefault()
        setItemNumberInArray(null);
        setEditableFormData(null);
        setShowForm(false);
        handleCancel();
    }

    const deleteFormItem = (index) => {
        setItemNumberInArray(index);
        setEditableFormData(null);
        setIsEditDone(true);
    }

    return <>
        
        {
            formData?.map( (item, index) => itemNumberInArray !== index && <div className="user-details" key={index}>
            <div className='user-addresses'>
                {
                    Object.entries(item).map( ([key, val ]) => 
                        key !== skipFields[key] && <p className="user-address-field">{keysAndLabels[key]}: {val}</p>
                    )
                }
            </div>
            <button className='product-detail-add-button' onClick={(e) => setUpEditFormData(index)}>Edit</button>
            {deleteOption && <button className='product-detail-add-button' onClick={(e) => deleteFormItem(index)}>Delete</button>}
        </div>)
        }
        
        {
            showForm && (<form ref={ref} className="user-detail-form">
            {
                editableFormData && Object.entries(editableFormData)?.map( 
                    ([key, val]) => 
                    key !== skipFields[key] && (<div className='form-item' key={key}>
                       
                        <label htmlFor={key} >{keysAndLabels[key]}</label>
                        <input id={key} type="text" value={val} onChange={(e) => handleField(e, key)} />
                        {formErrors?.[key] ? <p className="form-error-field">Required Field</p> : ""}
                    </div>)
                )
            }
            <button className='product-detail-add-button' onClick={handleFormSubmit} >Save</button>
            <button className='product-detail-add-button' onClick={cancelEdit}>Cancel</button>
            </form>)
        }
    </>


}

export default FormEditor;
