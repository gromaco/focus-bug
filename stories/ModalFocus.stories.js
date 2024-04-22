import { useRef } from "react";

import { IconAddLine } from "@instructure/ui-icons";

import { View } from "@instructure/ui-view";
import { SimpleSelect } from "@instructure/ui-simple-select";

import { useForm } from "react-hook-form";





import {
  CloseButton,
  Button,
  Modal,
  Heading,
  TextInput,
} from "@instructure/ui";

export const scaleLevels4tier = [
  {
    id: 7,
    scaleId: 2,
    abbrName: "xm",
    shortName: "exceeds mast",
    longName: "Exceeds Mastery",
    scaleLevelColorId: 11,
    order: 1,
    cutoff: false,
    exportValue: 4,
  },
  {
    id: 6,
    scaleId: 2,
    abbrName: "m",
    shortName: "mastery",
    longName: "Mastery",
    scaleLevelColorId: 1,
    order: 2,
    cutoff: true,
    exportValue: 3,
  },
  {
    id: 5,
    scaleId: 2,
    abbrName: "nm",
    shortName: "near mastery",
    longName: "Near Mastery",
    scaleLevelColorId: 2,
    order: 3,
    cutoff: false,
    exportValue: 2,
  },
];
export const addAssessmentConfig = (scaleLevels) => {
  return {
    addAssessment: {
      maxAssessmentItems: 150,
      disabled: false,
      addAssessmentFormAction: "/add/assessment/action",
      searchCommunityItem: {
        href: "/materials?classroom_id=327967&filters%5Bclass_objective%5D=27&filters%5Bobjective%5D=393&filters%5Bpathway%5D=4&filters%5Bsubject%5D=1&filters%5Bupdate_preferred_view%5D=list&filters%5Bview_layout%5D=list&include_substandards=1",
      },
      myAssessmentsItem: {
        href: "/materials/uploaded?classroom_id=327967&filters%5Bclass_objective%5D=27&filters%5Bcreated_by%5D=182915&filters%5Bobjective%5D=393&filters%5Bpathway%5D=4&filters%5Bsubject%5D=1&filters%5Bupdate_preferred_view%5D=list&filters%5Bview_layout%5D=list&include_substandards=1",
      },
      createNewItem: {
        href: "/materials/new?classroom_id=327967&objective_id=393&pathway_id=4&subject_id=1",
        draftAssessmentsEnabled: true,
        addAssessmentConfig: {
          classroomId: "327967",
          objectiveId: "393",
          pathwayId: "4",
          subjectId: "1",
        },
      },
      scaleLevels: scaleLevels,
      selectedStandardId: 522,
      standards: [
        {
          id: 520,
          name: "4.OA.A.1",
        },
        {
          id: 522,
          name: "4.OA.A.2",
        },
        {
          id: 523,
          name: "4.OA.A.3",
        },
        {
          id: 524,
          name: "4.OA.B.4",
        },
        {
          id: 526,
          name: "4.NBT.A.1",
        },
        {
          id: 531,
          name: "4.NBT.A.2",
        },
        {
          id: 525,
          name: "4.OA.C.5",
        },
        {
          id: 532,
          name: "4.NBT.A.3",
        },
        {
          id: 535,
          name: "4.NBT.B.4",
        },
        {
          id: 536,
          name: "4.NBT.B.5",
        },
        {
          id: 537,
          name: "4.NBT.B.6",
        },
        {
          id: 538,
          name: "4.NF.A.1",
        },
        {
          id: 539,
          name: "4.NF.A.2",
        },
        {
          id: 540,
          name: "4.NF.B.3",
        },
        {
          id: 541,
          name: "4.NF.B.4",
        },
        {
          id: 542,
          name: "4.NF.C.5",
        },
        {
          id: 543,
          name: "4.NF.C.6",
        },
        {
          id: 544,
          name: "4.NF.C.7",
        },
        {
          id: 545,
          name: "4.MD.A.1",
        },
        {
          id: 546,
          name: "4.MD.A.2",
        },
        {
          id: 547,
          name: "4.MD.A.3",
        },
        {
          id: 548,
          name: "4.MD.B.4",
        },
        {
          id: 549,
          name: "4.MD.C.5",
        },
        {
          id: 550,
          name: "4.MD.C.6",
        },
        {
          id: 551,
          name: "4.MD.C.7",
        },
        {
          id: 552,
          name: "4.G.A.1",
        },
        {
          id: 553,
          name: "4.G.A.2",
        },
        {
          id: 554,
          name: "4.G.A.3",
        },
      ],
    },
  };
};

const Example = () => {
  return (
      <RawScoreModal
          open={true}
          submitForm={false}
          addAssessmentConfig={addAssessmentConfig(scaleLevels4tier).addAssessment}
      />
  );
};




const registerInput = ({ ref: inputRef, ...rest }) => {
  return { inputRef, ...rest };
};

const RawScoreModal = ({
                         open,
                         onDismiss,
                         submitForm = true,
                         selectedStandard,
                         addAssessmentConfig,
                         authenticityToken,
                       }) => {
  const {
    addAssessmentFormAction,
    standards,
    selectedStandardId,
  } = addAssessmentConfig;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({ reValidateMode: "onBlur" });

  const formRef = useRef();
  let standard = selectedStandardId ?? standards[0]?.id;
  if (selectedStandard) {
    standard = selectedStandard;
  }

  const handleCloseClick = () => {
    onDismiss();
  };

  const handleFormSubmit = (data) => {
    if (submitForm) {
      formRef.current.submit();
    } else {
      // eslint-disable-next-line no-console
      console.log({ data });
    }
  };

  const setFormRef = (ref) => {
    if (!ref) return;
    formRef.current = ref._root;
  };

  return (
      <Modal
          contentRef={setFormRef}
          as={"form"}
          open={open}
          action={addAssessmentFormAction}
          method={"Post"}
          onSubmit={handleFormSubmit}
          label={"Enter Raw Scores"}
          data-qa="raw_scores_form"
      >
        <Modal.Header>
          <View display={"flex"}>
            <Heading>Enter Raw Scores</Heading>
            <View margin={"0 0 0 auto"}>
              <CloseButton
                  size={"medium"}
                  onClick={handleCloseClick}
                  screenReaderLabel="Close"
              />
            </View>
          </View>
        </Modal.Header>
        <Modal.Body>
          <input
              type={"hidden"}
              value={authenticityToken}
              name={"authenticity_token"}
          />
          <View as={"div"} height={"29rem"} width={"24.5rem"}>
            {/*##########   Standard   ###############*/}
            <input
                type="hidden"
                value={getValues("assessment.objective_id") || standard}
                {...register("assessment[objective_id]", { required: true })}
            />
            <View as={"div"} margin={"0 0 medium"}>
              <SimpleSelect
                  onChange={(e, { id }) => {
                    setValue("assessment.objective_id", `${id}`);
                  }}
                  renderLabel="Standard"
                  defaultValue={`${standard}`}
                  data-qa="standard_dropdown"
              >
                {standards.map(({ name, id }) => (
                    <SimpleSelect.Option id={`${id}`} value={`${id}`} key={id}>
                      {name}
                    </SimpleSelect.Option>
                ))}
              </SimpleSelect>
            </View>
            {/*##########   Title    ###############*/}
            <View as={"div"} margin={"0 0 medium"}>
              <TextInput
                  {...registerInput(
                      register("assessment[title]", {
                        required: true,
                        maxLength: 255,
                      })
                  )}
                  renderLabel="Title"
                  data-qa="title_input"
              />
            </View>
          </View>
        </Modal.Body>
        <Modal.Footer>
          <Button
              margin="0 x-small 0 0"
              onClick={handleCloseClick}
              data-qa="close_btn"
          >
            Close
          </Button>
          <Button
              renderIcon={IconAddLine}
              color="primary"
              onClick={handleSubmit(handleFormSubmit)}
              type="button"
              data-qa="add_to_tracker_btn"
          >
            Add to Tracker
          </Button>
        </Modal.Footer>
      </Modal>
  );
};


export const FocusBug = () => {
  // Simulate multiple setTimeout tasks
  for (let i = 0; i < 100000; i++) {
    setTimeout(() => {
      console.log(`Task ${i} executed`);
    }, 0);
  }

// Simulate microtasks with Promise.resolve
  for (let i = 0; i < 1000; i++) {
    Promise.resolve().then(() => {
      console.log(`Microtask ${i} executed`);
    });
  }

  return (
      <RawScoreModal
          open={true}
          submitForm={false}
          addAssessmentConfig={addAssessmentConfig(scaleLevels4tier).addAssessment}
      />
  )
}

export default {
  title: "ModalFocus",
  component: RawScoreModal
}
