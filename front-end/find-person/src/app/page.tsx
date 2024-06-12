'use client'
import { Card, Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { Register } from '../types/Register';
import style from './page.module.css'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: Register) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/users/', values);
      message.success('Usuario registrado con éxito');
      form.resetFields();
      if(response.status === 201) {
        console.log(response.data);
      }
    } catch (error) {
      message.error('Error al registrar el usuario');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={style.div}>
    <Card
      style={{ width: 500 }}
    >
      <h1>Ingresa tus datos</h1>
      <Form
        layout='vertical'
        name='register'
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label='Nombre'
          name='name'
          rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
        >
          <Input placeholder='Ingresa tu nombre' />
        </Form.Item>
        <Form.Item
          label='Apellido'
          name='lastname'
          rules={[{ required: true, message: 'Por favor ingresa tu apellido' }]}
        >
          <Input placeholder='Ingresa tu apellido' />
        </Form.Item>
        <Form.Item
          label='Edad'
          name='age'
          rules={[{ required: true, message: 'Por favor ingresa tu edad' }]}
        >
          <Input placeholder='Ingresa tu edad' />
        </Form.Item>
        <Form.Item
          label='DUI'
          name='dui'
          rules={[{ required: true, message: 'Por favor ingresa tu DUI' }]}
        >
          <Input placeholder='Ingresa tu DUI' type='number'/>
        </Form.Item>
        <Form.Item
          label='Albergue'
          name='albergue'
          rules={[{ required: true, message: 'Por favor ingresa tu albergue' }]}
        >
          <Input placeholder='Ingresa tu albergue' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' size='large' loading={loading} ghost>
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </Card>
    <Button
      type='primary'
      onClick={() => router.push('/pages/find')}
    >
      Buscar usuarios
    </Button>
  </div>
  );
}
