import React, { useState } from 'react';

const UploadFile = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            alert('Please select a file.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch('http://localhost:5000/uploadfile', {
                method: 'POST',
                body: formData
            });

            const data = await response.text();
            console.log(data);
            alert('File uploaded successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to upload file.');
        }
    };

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'></div>
                    <div className='col-md-4 col-sm-12'>
                        <h2>File Upload</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input className="form-control" type="file" id="formFileMultiple" onChange={handleFileChange} />
                            </div>
                            <button type="submit" className='btn btn-primary'>Upload</button>
                        </form>
                    </div>
                    <div className='col-md-4'></div>
                </div>
            </div>
        </div>
    );
};

export default UploadFile;
