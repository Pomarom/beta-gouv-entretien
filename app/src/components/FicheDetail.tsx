import React, { useState, useEffect, ReactNode } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
export const FicheDetail = () => {

    const [fiche, setFiche] = useState({md: '', status: '-' as string | null})
    const { id } = useParams();

    const getFiche = () => {
        return axios.get(`http://localhost:8080/missions/${id}`)
    }

    useEffect(() => {
        getFiche()
        .then(({ data }) => {
            
            const { md, status } = data
            const splitted = md.split("---")
            if (splitted.length <= 1) {
                return setFiche(data)
            }

            const [emptyElement, header, ...rest] = splitted
            return setFiche({ md: rest.join(), status})
        })
        .catch(() => setFiche({md: 'Aucune fiche disponible', status: null}))
    }, []);
    return (
        <div>
            {fiche.status && <h3>Statut: {fiche.status}</h3>}
            <Markdown remarkPlugins={[remarkGfm]}>{fiche.md}</Markdown>
        </div>
        
    )
}
