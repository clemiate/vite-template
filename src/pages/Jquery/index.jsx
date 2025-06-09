import React, { useEffect } from "react";
import $ from 'jquery';

import './index.scss';

const JqueryDemo = () => {

    useEffect(() => {
        setTimeout(() => {
            $('.custom-tooltip').hover(function(e) {
                var tooltip = $(this).find('.tooltip-text');
                tooltip.css({ top: e.pageY + 20, left: e.pageX - 60 }); // Adjust position as needed
            });
        }, 0);
    }, []);


    return <div>
        <div class="custom-tooltip">鼠标悬停我！<span className="tooltip-text">这是一个 tooltip!</span></div>
    </div>
}
export default JqueryDemo;