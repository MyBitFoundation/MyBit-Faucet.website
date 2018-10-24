import React, { Component } from 'react';
import Input from '@bit/mybit.ui.kit.input';
import ConnectionStatus from '@bit/mybit.ui.kit.connection-status';
import Button from '@bit/mybit.ui.kit.button';
import styled from 'styled-components';
import { MainLayout } from '../../layouts/index.js';
import { secureGraphic } from '../../modules/Images';
import BlockchainContext from '../../modules/Blockchain/containers/BlockchainInfoContext';
 
const StyledFormContainer = styled.div`
    display: flex;
    justify-content: center;
    form {
        background: #fff;
        border-radius: 3px;
        color: #333;
        display: flex;
        flex-direction: column;
        max-width: 400px;
        min-width: 320px;
        width: 100%;
        min-height: 500px;
        overflow: hidden;
        padding: 60px;
    }
`

class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAddress: '',
            amount: 0,
        }
    }
    handleAddressChange = (e) => {
        this.setState({
            userAddress: e.target.value
        })
    }
    handleAmountChange = (e) => {
        this.setState({ amount: e })
    }
    render() {
        return (
            <BlockchainContext.Consumer>
                {({network}) => (
                    <MainLayout>
                        <StyledFormContainer>
                            <form>
                                <ConnectionStatus network={network} />
                                <img style={{ marginBottom: '60px'}} src={secureGraphic} alt="Secure Connection" />
                                <br/>
                                Your ETH address
                                <Input 
                                    tooltipTitle="Your address" 
                                    onChange={this.handleAddressChange} 
                                    hasTooltip={true} 
                                    value={this.state.userAddress}
                                />
                                <br/>
                                Amount ETH to withdraw
                                <Input 
                                    type="number"
                                    min="0"
                                    tooltipTitle="How many tokens you'd like to withdraw" 
                                    onChange={this.handleAmountChange} 
                                    hasTooltip={true} 
                                    value={this.state.amount}
                                />
                                <br/>
                                <Button type="solid">Withdraw</Button>

                            </form>
                        </StyledFormContainer>
                    </MainLayout>
                )}
            </ BlockchainContext.Consumer>
        )
    }
}

export default HomeView