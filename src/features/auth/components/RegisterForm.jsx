import { Button } from '@/components/Elements';
import { Form, InputField, SelectField } from '@/components/Form';
import { useTeams } from '@/features/teams';
import { useAuth } from '@/lib/auth';
import { Switch } from '@headlessui/react';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Link } from 'react-router-dom';
import * as z from 'zod';

const schema = z
  .object({
    email: z.string().min(1, 'Required'),
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
  })
  .and(
    z
      .object({
        teamId: z.string().min(1, 'Required'),
      })
      .or(z.object({ teamName: z.string().min(1, 'Required') }))
  );

export const RegisterForm = ({ onSuccess }) => {
  const { register, isRegistering } = useAuth();
  const [chooseTeam, setChooseTeam] = React.useState(false);

  const teamsQuery = useTeams({
    config: {
      enabled: chooseTeam,
    },
  });

  return (
    <div>
      <Form
        onSubmit={async (values) => {
          await register(values);
          onSuccess();
        }}
        schema={schema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="text"
              label="First Name"
              error={formState.errors['firstName']}
              registration={register('firstName')}
            />
            <InputField
              type="text"
              label="Last Name"
              error={formState.errors['lastName']}
              registration={register('lastName')}
            />
            <InputField
              type="email"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <InputField
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />

            <Switch.Group>
              <div className="flex items-center">
                <Switch
                  checked={chooseTeam}
                  onChange={setChooseTeam}
                  className={`${
                    chooseTeam ? 'bg-blue-600' : 'bg-gray-200'
                  } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  <span
                    className={`${
                      chooseTeam ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                  />
                </Switch>
                <Switch.Label className="ml-4 dark:text-gray-400">Join Existing Team</Switch.Label>
              </div>
            </Switch.Group>

            {chooseTeam && teamsQuery.data ? (
              <SelectField
                label="Team"
                error={formState.errors['teamId']}
                registration={register('teamId')}
                options={teamsQuery?.data?.map((team) => ({
                  label: team.name,
                  value: team.id,
                }))}
              />
            ) : (
              <InputField
                type="text"
                label="Team Name"
                error={formState.errors['teamName']}
                registration={register('teamName')}
              />
            )}
            <div>
              <Button isLoading={isRegistering} type="submit" className="w-full">
                Register
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link to="../login" className="font-medium text-blue-600 hover:text-blue-500">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

RegisterForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};
