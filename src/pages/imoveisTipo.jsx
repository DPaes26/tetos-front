import { App, Button, Drawer, Form, Input, Popconfirm, Table } from "antd";
import { LuPencil, LuPlus, LuTrash2 } from "react-icons/lu";
import { useBuscarImoveisTipo, useCriarImoveisTipo, useDeletarImoveisTipo, useEditarImoveisTipo } from "../hooks/imoveisTipoHooks";
import { useState } from "react";

const ImoveisTipo = () => {
    const [mostrarCriar, setMostrarCriar] = useState(false);
    const [mostrarEditar, setMostrarEditar] = useState(false);
    const { notification } = App.useApp();
    const { data: tipos, isLoading: loadingImoveisTipo } = useBuscarImoveisTipo();
    const { mutate: criarImoveisTipo, isLoading: loadingCriar } = useCriarImoveisTipo();
    const { mutate: editarImoveisTipo, isLoading: loadingEditar } = useEditarImoveisTipo();
    const { mutate: deletarImoveisTipo } = useDeletarImoveisTipo();
    const [formEditar] = Form.useForm();

    function criar(dados) {
        criarImoveisTipo(dados, {
            onSuccess: ({ type, description }) => {
                setMostrarCriar(false);
                notification[type]({
                    description,
                    placement: "bottomRight"
                })
            },
            onError: ({ response: { data: { type, description } } }) => {
                notification[type]({
                    description
                })
            }
        })
    }

    function editar(dados) {
        // console.log(...dados);

        editarImoveisTipo(dados, {
            onSuccess: ({ type, description }) => {
                setMostrarEditar(false);
                notification[type]({
                    description,
                    placement: "bottomRight"
                })
            },
            onError: ({ response: { data: { type, description } } }) => {
                notification[type]({
                    description
                })
            }
        })
    }

    function deletar(id) {
        deletarImoveisTipo(id, {
            onSuccess: ({ type, description }) => {
                notification[type]({
                    description,
                    placement: "bottomRight"
                })
            },
            onError: ({ response: { data: { type, description } } }) => {
                notification[type]({
                    description
                });
            }
        })
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold mb-4">Tipos de imóvel</h2>
                <Button
                    type="primary"
                    icon={<LuPlus />}
                    onClick={() => setMostrarCriar(true)}
                >Novo tipo</Button>
            </div>
            <div>
                <Table
                    dataSource={tipos || []}
                    loading={loadingImoveisTipo}
                    rowKey={"id"}
                >
                    <Table.Column
                        title="Nome"
                        dataIndex="nome"
                    />
                    <Table.Column
                        title="Ações"
                        className="w-25"
                        render={(_, linha) => (
                            <div className="flex gap-2">
                                <Button
                                    icon={<LuPencil />}
                                    type="primary"
                                    onClick={() => {
                                        formEditar.setFieldValue("id", linha.id);
                                        formEditar.setFieldValue("nome", linha.nome);
                                        setMostrarEditar(true);
                                    }}
                                />
                                <Popconfirm
                                    title="Tem certeza que deseja excluir este nível?"
                                    description="Esta ação não pode ser desfeita."
                                    okText="Sim"
                                    cancelText="Não"
                                    onConfirm={() => deletar(linha.id)}
                                >
                                    <Button
                                        icon={<LuTrash2 />}
                                        type="primary"
                                    />

                                </Popconfirm>
                            </div>

                        )}
                    />


                </Table>
            </div>


            <Drawer
                title="Criar"
                onClose={() => setMostrarCriar(false)}
                open={mostrarCriar}
            >
                <Form
                    layout="vertical"
                    onFinish={criar}
                >

                    <Form.Item
                        label="Nome"
                        name="nome"
                        rules={[{ required: true, message: 'Por favor, insira o nome do nível!' }]}
                    >
                        <Input placeholder="Nome do nível" />
                    </Form.Item>
                    <div className="flex justify-end">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loadingCriar}
                        >
                            Enviar
                        </Button>

                    </div>
                </Form>
            </Drawer>

            <Drawer
                title="Editar"
                onClose={() => setMostrarEditar(false)}
                open={mostrarEditar}
            >
                <Form
                    layout="vertical"
                    onFinish={editar}
                    form={formEditar}
                >

                    <Form.Item
                        name="id"
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Nome"
                        name="nome"
                        rules={[{ required: true, message: 'Por favor, insira o nome do nível!' }]}
                    >
                        <Input placeholder="Nome do nível" />
                    </Form.Item>
                    <div className="flex justify-end">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loadingEditar}
                        >
                            Enviar
                        </Button>

                    </div>
                </Form>
            </Drawer>

        </div>
    );
}

export default ImoveisTipo;