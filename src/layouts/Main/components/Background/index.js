import styled from 'styled-components';
import { overlay } from '../../../../modules/Images';

const StyledBackground = styled.div`
    height: 100%;
    color: white;
    width: 100%;
    overflow-x: hidden;
    min-height: 100vh;
    background-image: url('${overlay}'), linear-gradient(62deg, rgb(0, 19, 88), rgb(18, 90, 196));
    background-repeat: no-repeat;
    background-position: top left, center center;
    margin: 0px auto;
    padding: 0px 16px;
    box-sizing: border-box;
`

export default StyledBackground;