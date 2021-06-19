import React, {useEffect, useState} from "react";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(candidate, phase, sponsors, institutions, trialPhase, details) {
    return {
        candidate,
        phase,
        sponsors,
        institutions,
        trialPhase,
        details
    };
}


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

function VaccineTable() {
    const [vaccine, setVaccine] = useState([]);
    const rows = [];
    const classes = useStyles();
    useEffect(() => {
            const getVaccinesData = async () => {
                fetch("https://disease.sh/v3/covid-19/vaccine")
                    .then((response) => response.json())
                    .then(({data}) => {
                            data.forEach(element => {
                                rows.push(createData(
                                    element.candidate,
                                    element.mechanism,
                                    element.sponsors,
                                    element.institutions,
                                    element.trialPhase,
                                    element.details));
                            });
                            setVaccine(rows);

                        }
                    );
            };
            getVaccinesData();
        },
        []);
    console.log("vaccine" + vaccine.length);


    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Candidate</StyledTableCell>
                        <StyledTableCell align="right">Mechanism</StyledTableCell>
                        <StyledTableCell align="right">Sponsors</StyledTableCell>
                        <StyledTableCell align="right">Institutions</StyledTableCell>
                        <StyledTableCell align="right">Phase</StyledTableCell>
                        <StyledTableCell align="right">Details</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vaccine.map((row) => (
                        <StyledTableRow key={row.candidate}>
                            <StyledTableCell component="th" scope="row">
                                {row.candidate}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.phase}</StyledTableCell>

                            <StyledTableCell align="right">
                                <ul>{row.sponsors.map(sponsor => <li>{sponsor}</li>)}</ul>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <ul>{row.institutions.map(institute => <li>{institute}</li>)}</ul>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.trialPhase}
                            </StyledTableCell>
                            <StyledTableCell align="right"><a href="">details</a></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default VaccineTable;
