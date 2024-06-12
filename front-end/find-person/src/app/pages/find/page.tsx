'use client'
import { Card, Form, Input, Button, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { User, findUser } from '@/types/Register'

const Page = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User| null>(null)

  const onFinish = async (values: findUser) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/users/filterByDui', values);
      message.success('Usuario encontrado');
      form.resetFields();
      if(response) {
        setUser(response.data)
        form.setFieldsValue(response.data)
      }
    } catch (error) {
      message.error('El usuario no se encuentra en la base de datos');  
    } finally {
      setLoading(false);
    }
  }


  return (
    <div>
      {
        user ? (
          <div className={styles.form}>
            <Card>
              <p style={{fontSize:'32px', marginBottom:'2%'}}>Informacion del usuario</p>
              <Form
                form={form}
                layout='vertical'
              >
                <Form.Item
                  label='DUI'
                  name='dui'
                >
                  <Input readOnly/>
                </Form.Item>
                <Form.Item
                  label='Nombre'
                  name='name'
                  >
                  <Input readOnly/>
                </Form.Item>
                <Form.Item
                  label='Apellido'
                  name='lastname'
                  >
                  <Input readOnly/>
                </Form.Item>
                <Form.Item
                  label='Edad'
                  name='age'
                  >
                  <Input readOnly/>
                </Form.Item>
                <Form.Item
                  label='Albergue'
                  name='albergue'
                  >
                  <Input readOnly/>
                </Form.Item>
                <Form.Item>
                  <Button 
                    type='primary' 
                    size='large'
                    onClick={() => setUser(null)}
                    >
                    Buscar de nuevo
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        ) : (
        <div className={styles.form}>
          <Card>
            <h1>Bienvenido a tu Portal</h1>
            <Form
              layout='vertical'
              form={form}
              onFinish={onFinish}
              >
              <Form.Item
                label='Ingresa tu DUI'
                name='dui'
                rules={[{ required: true, message: 'Por favor ingresa tu DUI' }]}
                >
                <Input placeholder='Ingresa numero de DUI' type='number'/>
              </Form.Item>
              <Form.Item>
              <Button 
                loading={loading}
                type='primary' 
                htmlType='submit' 
                size='large'>
                Buscar
              </Button>
            </Form.Item>
            </Form>
          </Card>
        </div>
        )
      }
    </div>
  )
}

export default Page
