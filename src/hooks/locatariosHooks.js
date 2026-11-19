// Hook de buscar dados na api, nos dados da tabela locatarios

import { useMutation, useQuery } from "@tanstack/react-query"
import { AXIOS, QUERYCLIENT } from "../services";

export const useBuscarImoveisTipo = () => {
    return useQuery({
        queryKey: ['locatarios'],
        queryFn: async () => {
            const res = await AXIOS.get('/locatarios');
            return res.data;
        }
    });
}


export const useCriarImoveisTipo = () => {
    return useMutation({
        queryKey: ['locatarios'],
        mutationFn: async (dados) => {
            const res = await AXIOS.post('/locatarios', dados);

            return res.data;
        },
        onSuccess: () => {
            QUERYCLIENT.invalidateQueries({
                queryKey: ['locatarios']
            })
        }
    });
}

export const useEditarImoveisTipo = () => {
    return useMutation({
        queryKey: ['locatarios'],
        mutationFn: async (dados) => {
            const res = await AXIOS.put(`/locatarios/${dados.id}`, dados);

            return res.data;
        },
        onSuccess: () => {
            QUERYCLIENT.invalidateQueries({
                queryKey: ['locatarios']
            })
        }
    });
}

export const useDeletarImoveisTipo = () => {
    return useMutation({
        queryKey: ['locatarios'],
        mutationFn: async (id) => {
            const res = await AXIOS.delete(`/locatarios/${id}`);

            return res.data;
        },
        onSuccess: () => {
            QUERYCLIENT.invalidateQueries({
                queryKey: ['locatarios']
            })
        }
    });
}