'use client'
import { Card, Form, Input, Button } from 'antd'
import React from 'react'
import styles from './page.module.css'

const Page = () => {
  const [form] = Form.useForm()
  return (
    <div className={styles.form}>
      <Card>
        <h1>Bienvenido a tu Portal</h1>
        <Form
          layout='vertical'
          form={form}
        >
          <Form.Item
            label='Ingresa tu DUI'
            name='dui'
            rules={[{ required: true, message: 'Por favor ingresa tu DUI' }]}
          >
            <Input placeholder='Ingresa numero de DUI' type='number'/>
          </Form.Item>
          <Form.Item>
          <Button type='primary' htmlType='submit' size='large'>
            Buscar
          </Button>
        </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Page
