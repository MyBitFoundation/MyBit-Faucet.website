import React, { Component } from 'react';
import Input from '@bit/mybit.ui.kit.input';
import ConnectionStatus from '@bit/mybit.ui.kit.connection-status';
import Button from '@bit/mybit.ui.kit.button';
import styled from 'styled-components';
import { MainLayout } from '../../layouts/index.js';
import { secureGraphic } from '../../modules/Images';
import BlockchainContext from '../../modules/Blockchain/containers/BlockchainInfoContext';
import {address} from '../../constants/contracts/ropsten/MyBitFaucet';


class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAddress: null,
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
                {(blockchain) => (
                    <MainLayout>
                        <button onClick={()=> {
                            console.log(blockchain);
                            blockchain.getTransactions().then((err,res) => {
                                console.log(res);
                            })
                        }}>Click me</button>
                    </MainLayout>
                )}
            </ BlockchainContext.Consumer>
        )
    }
}

export default HomeView