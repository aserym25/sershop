import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 900px;
  margin: 6rem auto 4rem;
  padding: 0 2rem;
  text-align: center;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #D4AF37;
  margin-bottom: 1rem;
`

const Sub = styled.p`
  color: #888;
  font-size: 1.1rem;
`

export const AdminDashboard = () => {
    return (
        <Wrapper>
            <Title>⚙️ Administration</Title>
            <Sub>Tableau de bord administrateur — à venir.</Sub>
        </Wrapper>
    )
}

export default AdminDashboard
