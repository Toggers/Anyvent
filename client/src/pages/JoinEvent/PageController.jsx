import React, { Component,useState,useEffect } from 'react';
import { Icon } from '@material-ui/core'
import { Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import '../events.css';


function PageController({ totalEvents, fetchEvents, eventsPerPage}) {
    const [group, setGroup] = useState([]) 

    useEffect(() => {
        setGroup(1)
     }, []);


    if (totalEvents == 0) {
        return null
    }

    var pages = []
    let pagesPerGroup = 5

    let startPage = (group - 1) * pagesPerGroup + 1
    let maxPages = totalEvents / eventsPerPage
    var remainderEvents = totalEvents % eventsPerPage

    var page;
    for (page = startPage; page < startPage + pagesPerGroup; page++) {
        if (page > maxPages) {
            if (remainderEvents != 0) {
                remainderEvents = 0
            } else {
                break;
            }
        }
        pages.push(page)
    }

    var lastGroup = false;
    if (group * eventsPerPage * pagesPerGroup >= totalEvents) {
        lastGroup = true;
    } 


    function movePage(pageNum) {
        fetchEvents(pageNum)
    }

    function onArrowSwitch(forward) {
        if (forward) {
            let newPageNum = group * pagesPerGroup + 1
            setGroup(group+1)
            movePage(newPageNum)
        } else {
            let newPageNum = (group - 1) * pagesPerGroup
            setGroup(group-1)
            movePage(newPageNum)
        }
    }

    let backArrow;
    let forwardArrow
    if (group == 1 && lastGroup) {
        backArrow = <Icon color="primary"><ArrowBackIosIcon/></Icon>

        forwardArrow = <Icon color="primary"><ArrowForwardIosIcon/></Icon>
    } else if (group == 1) {
        backArrow = <Icon color="primary"><ArrowBackIosIcon/></Icon>

        forwardArrow = <Icon color="primary" onClick={() => onArrowSwitch(true)}><ArrowForwardIosIcon/></Icon>
    } else if (lastGroup) {
        backArrow = <Icon color="primary" onClick={() => onArrowSwitch(false)}><ArrowBackIosIcon/></Icon>

        forwardArrow = <Icon color="primary"><ArrowForwardIosIcon/></Icon>
    } else {
        backArrow = <Icon color="primary" onClick={() => onArrowSwitch(false)}><ArrowBackIosIcon/></Icon>

        forwardArrow = <Icon color="primary" onClick={() => onArrowSwitch(true)}><ArrowForwardIosIcon/></Icon>
    }

    return(
        <Grid container direction="row" justify="space-evenly" alignItems="center">
            {backArrow}
    
            { pages.map(num => (
                <Button id={num} size="medium" key={num} onClick={() => movePage(num)}>{num}</Button>
            ))}
    
            {forwardArrow}
        </Grid>
    )
} 

export default PageController