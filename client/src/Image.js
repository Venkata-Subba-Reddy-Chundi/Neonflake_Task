import React from "react";
import {AdvancedImage} from '@cloudinary/react'
import { Cloudinary } from "@cloudinary/url-gen";

import { thumbnail } from "@cloudinary/url-gen/actions/resize";

import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn"

const Image=({uploadedImg})=>{
    const cloud=new Cloudinary({
        cloud:{cloudName:'dprommewk'}
    })

    const myImage=cloud.image(uploadedImg)
    // myImage.resize(thumbnail().width(200).height(200).gravity(focusOn(FocusOn.face())))

    return(
        <>
        <AdvancedImage cldImg={myImage}/>
        </>
    )
}
export default Image