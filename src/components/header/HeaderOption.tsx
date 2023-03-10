import React from 'react';
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {Avatar, SvgIconProps, SvgIconTypeMap} from "@mui/material";
import './HeaderOption.css'
type HeaderOptionPropsType = {
    title?:string
    Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>
    avatar?: string
    onClick?: () => void
}

const HeaderOption = ({Icon,title,avatar, onClick}:HeaderOptionPropsType) => {
    return (
        <div onClick={onClick} className='headerOption'>
            {Icon && <Icon className='headerOption_icon'/>}
            {avatar && (
                <Avatar className='headerOption_icon' src={avatar}/>
            )}

            <h3 className='headerOptions_title'>{title}</h3>
        </div>
    );
};

export default HeaderOption;