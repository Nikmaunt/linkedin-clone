import React from 'react';
import './InputOption.css'
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SvgIconProps, SvgIconTypeMap} from "@mui/material";

type  InputOptionPropsType = {
    title:string
    Icon?:   OverridableComponent<SvgIconTypeMap<{}, "svg">>
    color?: string
}

const InputOption = ({Icon, title, color}:InputOptionPropsType) => {
    return (
        <div className='inputOption'>
            { Icon && <Icon style={{color:color}}/>}
            <h4>{title}</h4>
        </div>
    );
};

export default InputOption;