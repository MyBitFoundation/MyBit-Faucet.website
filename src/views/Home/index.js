import React, { Component } from 'react';
import dayjs from 'dayjs'
import { Table, Modal } from 'antd';
import 'antd/lib/table/style/css'
import 'antd/lib/modal/style/css'
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
            showMetamaskModal: true,
            userAddress: null,
            amount: 0,
        }
    }
    componentDidMount() {
        if(window.ethereum) {
            this.setState({showMetamaskModal: false})
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
                {(blockchain) => {

                    return (
                    <MainLayout>
                        <Modal
                            title="You need the MetaMask extension to use the faucet."
                            closable={false}
                            visible={this.state.showMetamaskModal}
                            onOk={() => {}}
                            onCancel={() => {}}
                            footer={null}
                            >
                            <a href="http://metamask.io" target="_blank">
                                <img style={{maxWidth: '100%'}} src="https://raw.githubusercontent.com/MetaMask/faq/master/images/download-metamask.png" alt="download MetaMask"/>
                            </a>
                        </Modal>
                        <StyledFormContainer>
                            <form>
                                <ConnectionStatus network={blockchain.network} />
                                <img style={{ marginBottom: '60px'}} src={secureGraphic} alt="Secure Connection" />
                                
                                <br/>
                                {blockchain.user.myBitBalance < 10000 && 
                                    <div style={{textAlign: 'center'}}>
                                        <Button size="large" type="solid" onClick={e => blockchain.withdraw()}>{`Withdraw ${10000 - blockchain.user.myBitBalance} MYB`}</Button>
                                        <br/>
                                        If you have less than 10 000 MYB tokens, the faucet will send you enough to reach it.
                                    </div>
                                }
                                {blockchain.user.myBitBalance >= 10000 && 
                                    <div style={{textAlign: 'center'}}>
                                        You need to have less than 10 000 MYB tokens in order to use the faucet.
                                    </div>
                                }

                            </form>
                        </StyledFormContainer>
                    </MainLayout>
                )}}
            </ BlockchainContext.Consumer>
        )
    }
}

export default HomeView