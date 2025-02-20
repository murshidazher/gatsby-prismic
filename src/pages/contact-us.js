import React from 'react';
import {graphql, navigate} from 'gatsby';
import Layout from '../components/layout';
import styled from 'styled-components';
import RichText from '../components/richText';
import { useForm } from '@formcarry/react';

export const query = graphql`
{
    prismic {
      allContact_pages {
        edges {
          node {
            form_title
            form_description
            form_fields {
              field_type
              field_name
              required
            }
          }
        }
      }
    }
  }  
`

const Form = styled.form`
    padding: 10px;
    background: #eee;
    margin-top: 20px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;

    input{
        margin-bottom: 10px;
        border-radius: 4px;
        height: 40px;
        border: 1px solid #eee;
        width: 100%;
    }

    textarea{
        margin-bottom: 10px;
        border-radius: 4px;
        height: 100px;
        border: 1px solid #eee;
        width: 100%;
        resize: none;
    }
`

const Button = styled.button`
    background: orange;
    color: white;
    cursor: pointer;
    padding: 4px 8px;
    box-shadow: none;
    border-radius: 4px;
`

const ContentWrapper = styled.section`
    max-width: 800px;
    margin: 0 auto;
`

const ContactUs = (props) => {

    const {state, submit} = useForm({
        id: '2lExiFvZpR'
    });

    // Success message
    if (state.submitted) {
        navigate('/contact-success');
    }
 
    return (
        <Layout>
            <ContentWrapper>
            <RichText render={props.data.prismic.allContact_pages.edges[0].node.form_title} />
            <RichText render={props.data.prismic.allContact_pages.edges[0].node.form_description} />

            <Form 
                name="contact-us"
                method="POST"
                onSubmit={submit}>
                {props.data.prismic.allContact_pages.edges[0].node.form_fields.map((field, i) => {
                    if(field.field_type === 'textarea'){
                        return (
                            <div key={i}>
                                <textarea 
                                    id={field.field_name}
                                    name={field.field_name}
                                    required={field.required === 'Yes'}
                                    placeholder={field.field_name} />
                            </div>
                        );
                    }else{
                        return (
                            <div key={i}>
                                <input 
                                    id={field.field_name}
                                    name={field.field_name}
                                    placeholder={field.field_name}
                                    required={field.required === 'Yes'}
                                    type={field.field_type} />
                            </div>
                        )
                    }
                })}
                <Button type="submit">
                    Submit
                </Button>
            </Form>
            </ContentWrapper>
            
        </Layout>
    )
};

export default ContactUs;