import React from 'react';
import styled from 'styled-components';

const FeedbackFormWrapper = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  width: 400px;
  margin: 0 auto;
`;

const FloatingIcon = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const FeedbackButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

const FeedbackFormModal = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  background-color: #fff;
  border-radius: 4px;
  max-width: 500px;
  margin: 100px auto;
  padding: 20px;
`;

const ModalContent = styled.div`
  /* ... other styles ... */
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ModalTitle = styled.h5`
  margin: 0;
`;

const ModalBody = styled.div`
  /* ... other styles ... */
`;

const ModalFooter = styled.div`
  /* ... other styles ... */
`;

const CloseButton = styled.button`
  /* ... other styles ... */
`;

const SubmitButton = styled.button`
  /* ... other styles ... */
`;

const FormGroup = styled.div`
  /* ... other styles ... */
`;

const Label = styled.label`
  /* ... other styles ... */
`;

const RatingInputWrapper = styled.div`
  /* ... other styles ... */
`;

const RatingLabel = styled.label`
  /* ... other styles ... */
`;

const Span = styled.span`
  /* ... other styles ... */
`;

const RatingLabels = styled.div`
  /* ... other styles ... */
`;

const TextInput = styled.input`
  /* ... other styles ... */
`;

const TextArea = styled.textarea`
  /* ... other styles ... */
`;

const FeedbackForm = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <FeedbackFormWrapper>
      <FloatingIcon>
        <FeedbackButton onClick={openModal}>Feedback</FeedbackButton>
      </FloatingIcon>
      <FeedbackFormModal isOpen={isOpen}>
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Feedback Form</ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              <form>
                <FormGroup>
                  <Label>How likely would you recommend us to your friends?</Label>
                  <RatingInputWrapper>
                    <RatingLabel>
                      <input type="radio" name="rating" />
                      <Span className="border rounded px-3 py-2">1</Span>
                    </RatingLabel>
                    {/* ... other rating labels ... */}
                  </RatingInputWrapper>
                  <RatingLabels>
                    <Label>Very unlikely</Label>
                    <Label>Very likely</Label>
                  </RatingLabels>
                </FormGroup>
                <FormGroup>
                  <Label>What made you leave us so early?</Label>
                  <TextInput type="text" placeholder="" />
                </FormGroup>
                <FormGroup>
                  <Label>Would you like to say something?</Label>
                  <TextArea rows="3"></TextArea>
                </FormGroup>
              </form>
            </ModalBody>
            <ModalFooter>
              <button type="button" onClick={closeModal}>
                Close
              </button>
              <SubmitButton type="button">Submit</SubmitButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </FeedbackFormModal>
    </FeedbackFormWrapper>
  );
};

export default FeedbackForm;
