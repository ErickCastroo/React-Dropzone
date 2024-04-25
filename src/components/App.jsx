import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '../css/file.css'; 

function App() {

  const [imagenUrl, setImagenUrl] = useState('');

  const onDrop = useCallback((acceptedFiles) => {}, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', 'tzihfexy');
    formData.append('api_key', '799925785455934');

    const res = await fetch('https://api.cloudinary.com/v1_1/dwjfyrikz/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setImagenUrl(data.secure_url); 
    }
  };

  return (
      <div className='container'>
        <h1>Subir imagen a cloudinary</h1>
      <div>
        <form onSubmit={handleSubmit}>

          <div {...getRootProps()} className={isDragActive ? 'dropzone active' : 'dropzone'}>
            <input {...getInputProps()} />
            <p>{isDragActive ? 'Suelte sus archivos aquí...' : 'Arrastre y suelte algunos archivos aquí o haga clic para seleccionar archivos'}</p>
          </div>
  
          {acceptedFiles[0] && (
            <div className="image-wrapper">
              <img
                src={URL.createObjectURL(acceptedFiles[0])}
                alt=""
                className="uploaded-image"
              />
              <button type="submit" className="custom-button">enviar a cloudinary</button>
            </div>
          )}
  
          {imagenUrl && (
            <div>
              <p>URL de la imagen en Cloudinary:</p>
              <a href={imagenUrl} target="_blank" rel="noopener noreferrer">{imagenUrl}</a>
            </div>
          )}
        </form>
      </div>
      </div>
  );
}

export default App;
