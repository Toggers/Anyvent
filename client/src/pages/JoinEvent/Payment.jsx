import React, {useState, useEffect} from 'react';
import '../events.css';
import '../AppNavBar/AppNavbar.jsx'
import AppNavbar from '../AppNavBar/AppNavbar.jsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PageController from './PageController.jsx';
import Divider from '@material-ui/core/Divider';

import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function Payment({event}) {
    async function handleToken(token) {

        const response = await axios.post('http://localhost:8000/checkout', {
            token, 
            event
        });

        const { status } = response.data
        
        if (status == "success") {
            toast("Success! Check email for details",
            { type: "success" });
        } else {
            toast("Something went wrong", { type: 
                "error" });
        }

    }

    return(
        <div>
            <StripeCheckout 
            stripeKey="pk_test_51H7UtaGly4p9IMX25P2l1nI1JKipvBCRbvX2nptwbhvPTylO7CzSD9sMDLlf9nO1tebyF1WPxYQccJe3UoGCi66n00DXVLPvbg"
            token={handleToken}
            billingAddress
            shippingAddress
            amount={event.price * 100}
            name={event.title}
            />
        </div>
    )
}

export default Payment