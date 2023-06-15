import React, { useCallback, useState } from "react";
import { Button } from "@mui/material";

const ImageUploader = ({ setImage }) => {

    let inputRef;

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = useCallback(async (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));

        const reader = new FileReader();
        reader.onload = () => {
            const base64Image = reader.result;
            setImage(base64Image);
            console.log("base64Image", base64Image)

        };
        reader.readAsDataURL(file);

    }, [setImage]);

    return (
        
        <div className="uploader-wrapper">
            <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                style={{ display: "none" }} 
                ref={(refParam) => (inputRef = refParam)}
            />
            {selectedImage && <img src={selectedImage} width={300} height={300} alt="Selected" />}
        <div className="uploader-button">
            <Button
            variant="outlined"
            color="primary"
            onClick={() => inputRef.click()}
            >
            사진 선택
            </Button>
        </div>
        </div>
        
    );

};

export default ImageUploader;